package it.nerdherd.betresults.rest.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LivePartiteRequestJson {

	@JsonProperty("matches")
	private String matches;

	public String getMatches() {
		return matches;
	}

	public void setMatches(String matches) {
		this.matches = matches;
	}
}
