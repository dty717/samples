package demoServer.domain;

import java.io.Serializable;

public class Greeting implements Serializable{

    private String content;

    public Greeting() {
    }

    public Greeting(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

}
