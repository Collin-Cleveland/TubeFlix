
import React from 'react';
import axios from 'axios';

const uploadVideo = () => {
  // a local state to store the currently selected file.
  const [file, setFile] = React.useState(null);

  const handleSubmit = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios({
        method: "post",
        url: "/api/fileupload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response)
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setFile(event.target.files[0])

  }

  return (

    <form onSubmit={handleSubmit}>
     <div>Description</div>
                <input type="text" name="description" required/>
                <div>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" value="Upload File" name="file" id="file"/>
</div>


    </form>
  )
};

export default uploadVideo;
