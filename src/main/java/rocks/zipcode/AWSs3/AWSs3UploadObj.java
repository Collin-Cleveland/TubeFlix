package rocks.zipcode.AWSs3;


import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Duration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rocks.zipcode.repository.VideoRepository;
import software.amazon.awssdk.auth.credentials.EnvironmentVariableCredentialsProvider;
import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

@Service
public class AWSs3UploadObj {

    @Autowired
    VideoRepository videoRepository;
    @Autowired
    AWSS3ClientServices awss3ClientServices;
    private static final Logger LOG = LoggerFactory.getLogger(GetS3ObjectPresignedUrl.class);
    String bucketName="tubeflix";

    // Places a new video into an Amazon S3 bucket.
    public void uploadFile(byte[] bytes, String fileName, String description) {

        try {

//            PutObjectRequest putOb = PutObjectRequest.builder()
//                .bucket(bucketName)
//                .key(fileName)
//                .build();
//            awss3ClientServices.getS3Client().putObject(putOb, RequestBody.fromBytes(bytes));
            PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType("image/png")
                .build();

            PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(30))
                .putObjectRequest(objectRequest)
                .build();
            PresignedPutObjectRequest presignedRequest = awss3ClientServices.getPresigner().presignPutObject(presignRequest);
            String myURL = presignedRequest.url().toString();
            System.out.println("Presigned URL to upload a file to: " +myURL);
            System.out.println("Which HTTP method needs to be used when uploading a file: " + presignedRequest.httpRequest().method());

            // Upload content to the Amazon S3 bucket by using this URL.
            URL url = presignedRequest.url();

            // Create the connection and use it to upload the new object by using the presigned URL.
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setRequestProperty("Content-Type","image/png");
            connection.setRequestMethod("PUT");
            connection.getOutputStream().write(bytes);
            connection.getResponseCode();
            System.out.println("HTTP response code is " + connection.getResponseCode());

        } catch (S3Exception | IOException e) {
            e.getStackTrace();
        }
    }

//    public void uploadFile(String fileName, InputStream inputStream)
//            throws S3Exception, AwsServiceException, SdkClientException, IOException {
//        S3Client client = S3Client.builder()
//        .credentialsProvider(EnvironmentVariableCredentialsProvider.create())
//        .build();
//
//
//        // Logger logger = LoggerFactory.getLogger(LoggingController.class);
//
//        PutObjectRequest request = PutObjectRequest.builder()
//                            .bucket(bucketName)
//                            .key(fileName)
//                            .build();
//
//        // try {
//        client.putObject(request,
//                RequestBody.fromInputStream(inputStream, inputStream.available()));
//        // }
//        // catch (Exception e){
//        //     logger.error("An ERROR Message");
//        // }
//    }
}
