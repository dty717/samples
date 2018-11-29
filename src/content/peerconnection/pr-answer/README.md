### Action track

start camera-->call somebody-->play-->download

the funcitons involved in
```
    start camera  (main.js/go_41)    & (main.js/go_33)
                    getUserMedia     &   gotStream
    
    call somebody (main.js/go_48)     &       (main.js/go_97)   &    (main.js/go_72)
                    start             &        startRecording   &   handleDataAvailable
    
    end   recording  (main.js/go_25)      &       (main.js/go_119)
                addEventListener('click') &        startRecording
    
       
    play  (main.js/go_37) 
      addEventListener('click')
    
    download   (main.js/go_47)
        addEventListener('click')
        
    test  (main.js/go_47)
        
        
```

so when start camera, start recording for 1 second, then download

