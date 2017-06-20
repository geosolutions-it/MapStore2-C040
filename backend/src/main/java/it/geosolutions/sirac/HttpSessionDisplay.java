package it.geosolutions.sirac;

import java.io.*;
import javax.servlet.http.*;
import java.util.*;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import it.geosolutions.geostore.services.UserSessionService;
import it.geosolutions.geostore.services.dto.UserSession;
import it.geosolutions.geostore.services.rest.model.SessionToken;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HttpSessionDisplay extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4620985297130419694L;
	
	private static final String BEARER_TYPE = "bearer";
	
	@Autowired
	UserSessionService userSessionService;
	
	String head;
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession(true);
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		Integer count = new Integer(0);
		if (session.isNew()) {
			head = "New Session Value";
		} else {
			head = "Old Session value";
			Integer oldcount =(Integer)session.getAttribute("count"); 
			if (oldcount != null) {
				count = new Integer(oldcount.intValue() + 1);
			}
		}
		session.setAttribute("count", count); 
		
		String showmethedata = "";
		String nome;
		Enumeration<String> nomi = session.getAttributeNames(); 
		while ( nomi.hasMoreElements()) {
			nome = nomi.nextElement();
			showmethedata += "<TR><TD>"+nome+"</TD>" +
					"<TD>" + session.getAttribute(nome) + "</TD>"+
					"</TR>";
		}
		
		ServletContext context = getServletContext();
		WebApplicationContext wac = WebApplicationContextUtils.
                getRequiredWebApplicationContext(context);

		// Initializes UserSessionService from Spring context
		if(userSessionService == null) {
			userSessionService = (UserSessionService)wac.getBean("userSessionService");
		}
		String msSession = session.getAttribute("mapstore_session_id").toString();
		UserSession eccolo = userSessionService.refreshSession(msSession, userSessionService.getRefreshToken(msSession));
		SessionToken ti_serve_questo = toSessionToken(eccolo.getId(), eccolo);
		
		
		String head = "<head><script> "
				+ "localStorage.setItem(\"mapstore_session_id\", \""+session.getAttribute("mapstore_session_id")+"\"); "
				+ "localStorage.setItem(\"session_token\", '{ \"access_token\": \""+ti_serve_questo.getAccessToken()+"\","
				+ "\"expires\": "+ti_serve_questo.getExpires()+","
				+ "\"refresh_token\": \""+ti_serve_questo.getRefreshToken()+"\","
				+ "\"token_type\": \""+ti_serve_questo.getTokenType()+"\"}'); "
				//+ "setTimeout(function(){ window.location.replace('/MapStore2_sirac'); }, 10000); "
				+ "</script></head>";
		
		out.println("<HTML>"+head+"<BODY BGCOLOR=\"pink\">\n" +
				"<H2 ALIGN=\"CENTER\">" + head + "</H2>\n" +  
				"<H3 ALIGN=\"CENTER\">Description about Session:</H3>\n" +
				"<TABLE BORDER=1 ALIGN=CENTER>\n" + 
				"<TR>\n" +
				"<TH>Information Type<TH>Session Value\n"+
				"<TR>\n" + "<TD>ID\n" +"<TD>" + 
				session.getId() + "\n" +"<TR>\n" + 
				" <TD>Session Creation Time\n" +" <TD>" + 
				new Date(session.getCreationTime()) + "\n" +
				"<TR>\n" +"  <TD>Last Session Access Time\n" +"  <TD>" +
				new Date(session.getLastAccessedTime()) + "\n" +
				"<TR>\n" +"  <TD>Number of Previous Session Accesses\n" +
				"<TD>" + count + "\n" +
				"<TR>\n" +"  <TD>mapstore_session_id\n" +
				"<TD>" + session.getAttribute("mapstore_session_id") +
				"<TR>\n" +"  <TD>it.people.sirac.authenticated_user_data\n" +
				"<TD>" + session.getAttribute("it.people.sirac.authenticated_user_data") +
				"<TR>\n" +"  <TD>it.people.sirac.authenticated_user\n" +
				"<TD>" + session.getAttribute("it.people.sirac.authenticated_user") +"</TR>"+
				showmethedata
				+"\n</TABLE>\n" +"</BODY></HTML>");
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		doGet(request, response);
	}
	
	private SessionToken toSessionToken(String accessToken, UserSession sessionToken) {
		if(sessionToken == null) {
			return null;
		}
		SessionToken token = new SessionToken();
		token.setAccessToken(accessToken);
		token.setRefreshToken(sessionToken.getRefreshToken());
		token.setExpires(sessionToken.getExpirationInterval());
		token.setTokenType(BEARER_TYPE);
		return token;
	}
}