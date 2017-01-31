
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Start {
	
	private static final Logger log = LoggerFactory.getLogger(Start.class);

	public static void main(final String[] args) throws Exception {
		String webPort = System.getenv("PORT");
		if (webPort == null || webPort.isEmpty()) {
			webPort = "8080";
		}
		final String webappDirLocation = "src/main/webapp/";

		final Server server = new Server(Integer.valueOf(webPort));
		final WebAppContext root = new WebAppContext();
		root.setContextPath("/");
		root.setDescriptor(webappDirLocation + "/WEB-INF/web.xml");
		root.setResourceBase(webappDirLocation);
		root.setParentLoaderPriority(true);
		
		log.info("START APP");

		server.setHandler(root);
		server.start();
		server.join();
	}
}
