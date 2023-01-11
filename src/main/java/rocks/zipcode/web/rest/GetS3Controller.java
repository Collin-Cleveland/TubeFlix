package rocks.zipcode.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import rocks.zipcode.AWSs3.GetS3ObjectPresignedUrl;
import rocks.zipcode.AWSs3.VideoStreamService;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
    public String getItems() {

      return pUrl.getPresignedUrl();
    }



}
