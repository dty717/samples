package javaServer.service;

import org.springframework.stereotype.Component;
import org.springframework.integration.annotation.ServiceActivator;

@Component(value = "receiveTcp")
public class ReceiveTcp {

    String buf[] = new String[100];
    int currentPosition = 0;

    @ServiceActivator
    public String saveValue(String value){
        System.out.println(value);
        buf[currentPosition] = value;
        currentPosition++;
        return value+":"+currentPosition;
    }

    public String[] transferBuffer() {
        String tempBuf[] = new String[100];
        tempBuf = buf;
        buf = new String[100];

        return tempBuf;
    }
}
