import javaServer.domain.Greeting;

import org.springframework.messaging.simp.SimpMessagingTemplate;
/**
 * Simple service that receives data in a byte array,
 * converts it to a String and appends it to 'echo:'.
 *
 * @author Gary Russell
 *
 */

public class EchoService {
    
    @Autowired
    private SimpMessagingTemplate template;
    
        
	public void test(String input) {
		if ("FAIL".equals(input)) {
			throw new RuntimeException("Failure Demonstration");
		}
		String text = "[" + "getTimestamp()" + "]:" + "greeting";
		System.out.println(template);
		this.template.convertAndSend("/topic/greetings", new Greeting(text));
		//return "echo:!!!-good day:" + input;
	}
	
    public String testOutput(String input) {
		if ("FAIL".equals(input)) {
			throw new RuntimeException("Failure Demonstration");
		}
		String text = "[" + "getTimestamp()" + "]:" + "greeting";
		System.out.println("template");
		//this.template.convertAndSend("/topic/greetings", new Greeting(text));
		return "echo:!!!-good day:" + input;
	}
}
