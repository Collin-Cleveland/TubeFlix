package rocks.zipcode.AWSs3;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.time.Duration;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.EnvironmentVariableCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.utils.IoUtils;
@Service
public class GetS3ObjectPresignedUrl {

    public static final String CONTENT_TYPE = "Content-Type";
    public static final String CONTENT_LENGTH = "Content-Length";
    public static final String VIDEO_CONTENT = "video/";
    private S3Client s3 = null ;

   // public S3Presigner getClient() {

//        // Create the S3Client object.
//        Region region = Region.US_EAST_1;
//        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(
//            "AKIAQVJL7P4ZBOCTTU7I",
//            "b0uvWp8Jdnmlz7k1iLewHFW2Pvi1cPLfPd7V+63E");
//        S3Presigner s3 = S3Presigner.builder()
//            .credentialsProvider(StaticCredentialsProvider.create(awsCreds)).region(region)
//            .build();
//        getPresignedUrl(s3, "tubeflix", "ocean.mp4");
//        return s3;
   // }
    public  String getPresignedUrl( ) {
        PresignedGetObjectRequest presignedGetObjectRequest=null;
        // Create the S3Client object.
        S3Presigner presigner=S3Presigner.builder()
            .credentialsProvider(EnvironmentVariableCredentialsProvider.create())
            .build();
        String bucketName="tubeflix";
        String keyName="ocean.mp4";
        try {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(keyName)
                .build();

            GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(60))
                .getObjectRequest(getObjectRequest)
                .build();

             presignedGetObjectRequest = presigner.presignGetObject(getObjectPresignRequest);
            HttpURLConnection connection = (HttpURLConnection) presignedGetObjectRequest.url().openConnection();
            presignedGetObjectRequest.httpRequest().headers().forEach((header, values) -> {
                values.forEach(value -> {
                    connection.addRequestProperty(header, value);
                });
            });

            // Send any request payload that the service needs (not needed when isBrowserExecutable is true).
            if (presignedGetObjectRequest.signedPayload().isPresent()) {
                connection.setDoOutput(true);

                try (InputStream signedPayload = presignedGetObjectRequest.signedPayload().get().asInputStream();
                     OutputStream httpOutputStream = connection.getOutputStream()) {
                    IoUtils.copy(signedPayload, httpOutputStream);
                }
            }

            // Download the result of executing the request.
            try (InputStream content = connection.getInputStream()) {
                System.out.println("Service returned response: ");
                IoUtils.copy(content, System.out);
            }

        } catch (S3Exception | IOException e) {
            e.getStackTrace();

        }
        return presignedGetObjectRequest.url().toString();
    }
}
