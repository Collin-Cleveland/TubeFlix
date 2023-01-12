package rocks.zipcode.AWSs3;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rocks.zipcode.domain.Video;
import rocks.zipcode.repository.VideoRepository;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;


@Service
public class GetS3ObjectPresignedUrl {
    private static final Logger LOG = LoggerFactory.getLogger(GetS3ObjectPresignedUrl.class);
    String bucketName="tubeflix";
    @Autowired
    VideoRepository videoRepository;
    @Autowired
    AWSS3ClientServices awss3ClientServices;

    public List<String> getLstPresignedUrl(){
        //method to generate PresignedUrl for all Objects in the bucket and store in the repository
        ListObjectsRequest listObjects = ListObjectsRequest
            .builder()
            .bucket(bucketName)
            .build();

        List<S3Object> objects = awss3ClientServices.getS3Client().listObjects(listObjects).contents();
        List<String> keys = new ArrayList<>();
        for (S3Object s3Obj: objects) {
            keys.add(getPresignedUrl(s3Obj.key()));
            Video video = new Video()
                .videoLink(getPresignedUrl(s3Obj.key()))
                .title(s3Obj.key())
                .description(s3Obj.eTag());
                    //.uploadDate(LocalDate.from(s3Obj.lastModified()));
            videoRepository.save(video);
        }
            return keys;
    }


    public  String getPresignedUrl(String keyName ) {
        //method to generate PresignedUrl for key
        PresignedGetObjectRequest presignedGetObjectRequest=null;
        Region region = Region.US_EAST_1;
        S3Presigner presigner=awss3ClientServices.getPresigner();
        try {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder().bucket(bucketName)
                                                                          .key(keyName)
                                                                          .build();

            GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
                                                             .signatureDuration(Duration.ofDays(2))
                                                             .getObjectRequest(getObjectRequest)
                                                             .build();

             presignedGetObjectRequest = presigner.presignGetObject(getObjectPresignRequest);

        } catch (S3Exception e) {
            e.getStackTrace();

        }
        return presignedGetObjectRequest.url().toString();
    }
}
