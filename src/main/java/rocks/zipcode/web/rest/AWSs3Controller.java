package rocks.zipcode.web.rest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import rocks.zipcode.AWSs3.AWSs3UploadObj;

@RestController
@RequestMapping("/api")
public class AWSs3Controller {
    
    @GetMapping("")
    public String showUploadPage() {
        return "upload";
    }

    @PostMapping("/upload")
    public String handleUploadForm(Model model, String title, String description,
            @RequestParam("file") MultipartFile multipart) {
        String fileName = multipart.getOriginalFilename();
         
        // System.out.println("Title: " + title);
        // System.out.println("Description: " + description);
        // System.out.println("filename: " + fileName);
         
        String message = "";
         
        try {
            AWSs3UploadObj.uploadFile(fileName, multipart.getInputStream());
            message = "Your file has been uploaded successfully!";
        } catch (Exception ex) {
            message = "Error uploading file: " + ex.getMessage();
        }
         
        model.addAttribute("message", message);
         
        return "message";              
    }
}
