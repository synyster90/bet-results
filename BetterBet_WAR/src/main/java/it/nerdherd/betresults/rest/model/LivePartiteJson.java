package it.nerdherd.betresults.rest.model;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LivePartiteJson {

	@JsonProperty("matches")
	private List<Matches> matches = new ArrayList<>();

	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Matches {
		private String id;
		private String status;
		private String period;
		private Score score;
		private boolean has_score;
		private Timestamp ft_date_time;
		private String details;
		private Mobile mobile;

		public Matches(@JsonProperty("id") String id, @JsonProperty("status") String status,
				@JsonProperty("period") String period, @JsonProperty("score") Score score,
				@JsonProperty("has_score") boolean has_score, @JsonProperty("ft_date_time") Timestamp ft_date_time,
				@JsonProperty("details") String details, @JsonProperty("mobile") Mobile mobile) {
			this.id = id;
			this.status = status;
			this.period = period;
			this.score = score;
			this.has_score = has_score;
			this.ft_date_time = ft_date_time;
			this.details = details;
			this.mobile = mobile;
		}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public String getPeriod() {
			return period;
		}

		public void setPeriod(String period) {
			this.period = period;
		}

		public Score getScore() {
			return score;
		}

		public void setScore(Score score) {
			this.score = score;
		}

		public boolean isHas_score() {
			return has_score;
		}

		public void setHas_score(boolean has_score) {
			this.has_score = has_score;
		}

		public Timestamp getFt_date_time() {
			return ft_date_time;
		}

		public void setFt_date_time(Timestamp ft_date_time) {
			this.ft_date_time = ft_date_time;
		}

		public String getDetails() {
			return details;
		}

		public void setDetails(String details) {
			this.details = details;
		}

		public Mobile getMobile() {
			return mobile;
		}

		public void setMobile(Mobile mobile) {
			this.mobile = mobile;
		}
	}

	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Score {
		private String home;
		private String away;

		public Score(@JsonProperty("home") String home, @JsonProperty("away") String away) {
			this.home = home;
			this.away = away;
		}

		public String getHome() {
			return home;
		}

		public void setHome(String home) {
			this.home = home;
		}

		public String getAway() {
			return away;
		}

		public void setAway(String away) {
			this.away = away;
		}
	}

	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Mobile {
		private String state;

		public Mobile(@JsonProperty("state") String state) {
			this.setState(state);
		}

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}
	}
}
