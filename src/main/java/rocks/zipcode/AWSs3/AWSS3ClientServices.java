package rocks.zipcode.AWSs3;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.EnvironmentVariableCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Service
public class AWSS3ClientServices {
    //Service to use AWSClient
    public S3Presigner getPresigner() {

        // Create the S3Presigner object.
        Region region = Region.US_EAST_1;
        return S3Presigner.builder()
            .credentialsProvider(EnvironmentVariableCredentialsProvider.create())
            .region(region)
            .build();
    }
    public S3Client getS3Client() {

        // Create the S3Client object.
        Region region = Region.US_EAST_1;
        return S3Client.builder()
            .credentialsProvider(EnvironmentVariableCredentialsProvider.create())
            .region(region)
            .build();
    }
}
