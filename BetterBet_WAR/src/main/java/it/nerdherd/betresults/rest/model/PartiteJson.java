package it.nerdherd.betresults.rest.model;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PartiteJson {

	@JsonProperty("competitions")
	private List<Competition> competitions = new ArrayList<>();

	@JsonProperty("Matches")
	private List<Matches> matches = new ArrayList<>();

	public List<Competition> getCompetitions() {
		return competitions;
	}

	public void setCompetitions(List<Competition> competitions) {
		this.competitions = competitions;
	}

	public List<Matches> getMatches() {
		return matches;
	}

	public void setMatches(List<Matches> matches) {
		this.matches = matches;
	}

	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Competition {
		private String competition_id;
		private String title;
		private List<Country> Country;

		public Competition(@JsonProperty("competition_id") String competition_id, @JsonProperty("title") String title,
				@JsonProperty("Country") List<Country> Country) {
			this.competition_id = competition_id;
			this.title = title;
			this.setCountry(Country);
		}

		public String getCompetition_id() {
			return competition_id;
		}

		public void setCompetition_id(String competition_id) {
			this.competition_id = competition_id;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public List<Country> getCountry() {
			return Country;
		}

		public void setCountry(List<Country> country) {
			Country = country;
		}
	}

	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Country {
		private String countryCode;
		private String displayName;

		public Country(@JsonProperty("countryCode") String countryCode,
				@JsonProperty("displayName") String displayName) {
			this.setCountryCode(countryCode);
			this.setDisplayName(displayName);
		}

		public String getCountryCode() {
			return countryCode;
		}

		public void setCountryCode(String countryCode) {
			this.countryCode = countryCode;
		}

		public String getDisplayName() {
			return displayName;
		}

		public void setDisplayName(String displayName) {
			this.displayName = displayName;
		}
	}

	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Matches {
		private String competition_id;
		private String match_id;
		private String date_time_utc_moment;
		private String team_A_id;
		private String team_A_title;
		private String team_B_id;
		private String team_B_title;

		public Matches(@JsonProperty("competition_id") String competition_id, @JsonProperty("match_id") String match_id,
				@JsonProperty("date_time_utc_moment") String date_time_utc_moment,
				@JsonProperty("team_A_id") String team_A_id, @JsonProperty("team_A_title") String team_A_title,
				@JsonProperty("team_B_id") String team_B_id, @JsonProperty("team_B_title") String team_B_title) {
			this.competition_id = competition_id;
			this.match_id = match_id;
			this.date_time_utc_moment = date_time_utc_moment;
			this.team_A_id = team_A_id;
			this.team_A_title = team_A_title;
			this.team_B_id = team_B_id;
			this.team_B_title = team_B_title;
		}

		public String getCompetition_id() {
			return competition_id;
		}

		public void setCompetition_id(String competition_id) {
			this.competition_id = competition_id;
		}

		public String getMatch_id() {
			return match_id;
		}

		public void setMatch_id(String match_id) {
			this.match_id = match_id;
		}

		public String getDate_time_utc_moment() {
			return date_time_utc_moment;
		}

		public void setDate_time_utc_moment(String date_time_utc_moment) {
			this.date_time_utc_moment = date_time_utc_moment;
		}

		public String getTeam_A_id() {
			return team_A_id;
		}

		public void setTeam_A_id(String team_A_id) {
			this.team_A_id = team_A_id;
		}

		public String getTeam_A_title() {
			return team_A_title;
		}

		public void setTeam_A_title(String team_A_title) {
			this.team_A_title = team_A_title;
		}

		public String getTeam_B_id() {
			return team_B_id;
		}

		public void setTeam_B_id(String team_B_id) {
			this.team_B_id = team_B_id;
		}

		public String getTeam_B_title() {
			return team_B_title;
		}

		public void setTeam_B_title(String team_B_title) {
			this.team_B_title = team_B_title;
		}

	}
}