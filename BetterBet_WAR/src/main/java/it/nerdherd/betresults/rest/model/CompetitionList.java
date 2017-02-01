package it.nerdherd.betresults.rest.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CompetitionList {

	@JsonProperty("competitions")
	private List<Competition> competitions;

	public List<Competition> getCompetitions() {
		return competitions;
	}

	public void setCompetitions(List<Competition> competitions) {
		this.competitions = competitions;
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
}