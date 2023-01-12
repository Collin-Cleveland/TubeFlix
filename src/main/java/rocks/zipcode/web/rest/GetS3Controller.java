package rocks.zipcode.web.rest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rocks.zipcode.AWSs3.GetS3ObjectPresignedUrl;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/api")
public class GetS3Controller {
    @Autowired
    GetS3ObjectPresignedUrl pUrl;

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

}
