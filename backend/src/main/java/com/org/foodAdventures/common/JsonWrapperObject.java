package com.org.foodAdventures.common;

public class JsonWrapperObject {
    private Object data;

    private String status;

    private String description;

    public JsonWrapperObject() {

    }
    public JsonWrapperObject(Object data) {
        this(null,null,data);
    }

    public JsonWrapperObject(String status,String description) {

        this(status,description,null);
    }


    public JsonWrapperObject(String status,String description,Object data) {

        this.status=status;
        this.description=description;
        this.data=data;
    }
    /**
     * @return the data
     */
    public Object getData() {
        return data;
    }
    /**
     * @param data the data to set
     */
    public void setData(Object data) {
        this.data = data;
    }
    /**
     * @return the status
     */
    public String getStatus() {
        return status;
    }
    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }
    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }
    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

}
