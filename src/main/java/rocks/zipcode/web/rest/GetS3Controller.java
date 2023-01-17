package rocks.zipcode.web.rest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rocks.zipcode.AWSs3.AWSs3UploadObj;
import rocks.zipcode.AWSs3.GetS3ObjectPresignedUrl;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class GetS3Controller {
    @Autowired
    GetS3ObjectPresignedUrl pUrl;
    @Autowired
    AWSs3UploadObj awSs3UploadObj;

    @GetMapping("/test")
    public String designer() {
        return "test";
    }

    @RequestMapping(value = "/items", method = RequestMethod.GET)
    @ResponseBody
    public String getItems(String key) {
        return pUrl.getPresignedUrl(key);
    }
    @RequestMapping(value = "/listS3Objects", method = RequestMethod.GET)
    @ResponseBody
    public List<String> getListObjectKeys() {
        return pUrl.getLstPresignedUrl();
    }
    @PostMapping("/fileupload")
    public void singleFileUpload(@RequestParam MultipartFile file) {

        try {
            byte[] bytes = file.getBytes();
            String name = file.getOriginalFilename();
            String desc2 = "Uploaded from Local machine";

            // Put the MP4 file into an Amazon S3 bucket.
            awSs3UploadObj.uploadFile(bytes, name, desc2);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
