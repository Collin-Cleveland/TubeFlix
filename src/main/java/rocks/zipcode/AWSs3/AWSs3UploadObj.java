package rocks.zipcode.AWSs3;


import java.io.IOException;
import java.io.InputStream;

import software.amazon.awssdk.auth.credentials.EnvironmentVariableCredentialsProvider;
import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

public class AWSs3UploadObj {
    private static final String BUCKET = "tubeflix";
     
    public static void uploadFile(String fileName, InputStream inputStream)
            throws S3Exception, AwsServiceException, SdkClientException, IOException {
        S3Client client = S3Client.builder()
        .credentialsProvider(EnvironmentVariableCredentialsProvider.create())
        .build();


        // Logger logger = LoggerFactory.getLogger(LoggingController.class);
         
        PutObjectRequest request = PutObjectRequest.builder()
                            .bucket(BUCKET)
                            .key(fileName)
                            .build();
         
        // try {
        client.putObject(request,
                RequestBody.fromInputStream(inputStream, inputStream.available()));
        // }
        // catch (Exception e){
        //     logger.error("An ERROR Message");
        // }
    }
}