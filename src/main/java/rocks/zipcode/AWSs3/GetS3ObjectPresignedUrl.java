package rocks.zipcode.AWSs3;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.EnvironmentVariableCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.utils.IoUtils;
@Service
public class GetS3ObjectPresignedUrl {
    private static final Logger LOG = LoggerFactory.getLogger(GetS3ObjectPresignedUrl.class);
    String bucketName="tubeflix";
    private S3Presigner getPresigner() {

        // Create the S3Presigner object.
        Region region = Region.US_EAST_1;
        return S3Presigner.builder()
            .credentialsProvider(EnvironmentVariableCredentialsProvider.create())
            .region(region)
            .build();
    }
    private S3Client getS3Client() {

        // Create the S3Client object.
        Region region = Region.US_EAST_1;
        return S3Client.builder()
            .credentialsProvider(EnvironmentVariableCredentialsProvider.create())
            .region(region)
            .build();
    }
    public List<String> getLstPresignedUrl(){
        //method to generate PresignedUrl for all Objects in the bucket
        ListObjectsRequest listObjects = ListObjectsRequest
            .builder()
            .bucket(bucketName)
            .build();

        List<S3Object> objects = getS3Client().listObjects(listObjects).contents();
        List<String> keys = new ArrayList<>();
        for (S3Object s3Obj: objects) {
            keys.add(getPresignedUrl(s3Obj.key()));
        }
            return keys;
    }

    public  String getPresignedUrl(String keyName ) {
        //method to generate PresignedUrl for key
        PresignedGetObjectRequest presignedGetObjectRequest=null;
        Region region = Region.US_EAST_1;
        S3Presigner presigner=getPresigner();
        try {
            ListObjectsRequest listObjects = ListObjectsRequest.builder()
                                                               .bucket(bucketName).build();

            GetObjectRequest getObjectRequest = GetObjectRequest.builder().bucket(bucketName)
                                                                          .key(keyName)
                                                                          .build();

            GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
                                                             .signatureDuration(Duration.ofMinutes(60))
                                                             .getObjectRequest(getObjectRequest)
                                                             .build();

             presignedGetObjectRequest = presigner.presignGetObject(getObjectPresignRequest);

        } catch (S3Exception e) {
            e.getStackTrace();

        }
        return presignedGetObjectRequest.url().toString();
    }
}
