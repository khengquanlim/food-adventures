import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String username;
    private String imageName;
    private String imageUrl;
    private String imageType;
    private byte[] imageByte;
    //private String caption;
    
    // Getters and setters
    public String getUsername(){
        return username;
    }

    public void setName(String newUsername){
        this.username = newUsername;
    }

    public String getImagename(){
        return imageName;
    }

    public void setImagename(String newImagename){
        this.imageName = newImagename;
    }

    public String getImageUrl(){
        return imageUrl;
    }

    public void setImageUrl(String newImageUrl){
        this.imageUrl = newImageUrl;
    }

    public String getImagetype(){
        return imageType;
    }

    public void setImagetype(String newImagetype){
        this.imageType = newImagetype;
    }

    public byte[] getPicByte() {
		return imageByte;
	}

	public void setPicByte(byte[] newPicByte) {
		this.imageByte = newPicByte;
	}
}
