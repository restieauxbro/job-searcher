import { createClient } from "@/utils/supabase/client";

export default function UploadPhoto() {
  const supabase = createClient();

  // Handle file upload event
  const uploadFile = async (event: any) => {
    const file = event.target.files[0];
    const bucket = "user-cvs";

    // Call Storage API to upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);

    // Handle error if upload failed
    if (error) {
      alert(`Error uploading file.: \n\n${error.message}`);
      return;
    }

    alert("File uploaded successfully!");
  };

  return (
    <div className="mt-8">
      <h1>Upload Profile Photo</h1>
      <input type="file" onChange={uploadFile} />
    </div>
  );
}
