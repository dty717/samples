### Action track

start camera-->start recording-->play-->download

the funcitons involved in
```
    start camera  (main.js/go_141)    & (main.js/go_131)& (main.js/go_123)
             addEventListener('click')& initCamera&        handleSuccess
    
    start recording  (main.js/go_25)      &       (main.js/go_97)  &    (main.js/go_72)
                addEventListener('click') &        startRecording  &   handleDataAvailable
    
    end   recording  (main.js/go_25)      &       (main.js/go_119)
                addEventListener('click') &        startRecording
    
       
    play  (main.js/go_37) 
      addEventListener('click')
    
    download   (main.js/go_47)
        addEventListener('click')
        
    test  (main.js/go_47)
        
        
```

so when start camera, start recording for 1 second, then download

