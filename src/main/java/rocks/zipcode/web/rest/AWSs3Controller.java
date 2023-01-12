package rocks.zipcode.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.servlet.ModelAndView;
import rocks.zipcode.AWSs3.AWSs3UploadObj;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class AWSs3Controller {
    @Autowired
    AWSs3UploadObj awSs3UploadObj;
    @GetMapping("")
    public String showUploadPage() {
        return "upload";
    }

    @PostMapping("/fileupload")
    public void singleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam String description) {

        try {
            byte[] bytes = file.getBytes();
            String name = file.getOriginalFilename() ;
            String desc2 = description ;

            // Put the MP4 file into an Amazon S3 bucket.
            awSs3UploadObj.uploadFile(bytes, name, desc2);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/upload")
    public void handleUploadForm(Model model, String title, String description,
            @RequestParam("file") MultipartFile multipart) {
//        String fileName = multipart.getOriginalFilename();
//
//        // System.out.println("Title: " + title);
//        // System.out.println("Description: " + description);
//        // System.out.println("filename: " + fileName);
//
//        String message = "";
//
//        try {
//            AWSs3UploadObj.uploadFile(fileName, multipart.getInputStream());
//            message = "Your file has been uploaded successfully!";
//        } catch (Exception ex) {
//            message = "Error uploading file: " + ex.getMessage();
//        }
//
//        model.addAttribute("message", message);
//
//        return "message";
    }
}
