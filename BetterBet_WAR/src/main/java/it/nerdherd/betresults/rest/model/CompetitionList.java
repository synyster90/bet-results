package it.nerdherd.betresults.rest.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class CompetitionList {

	@JsonProperty("competitions")
	private List<Competition> competitions;

	public List<Competition> getCompetitions() {
		return competitions;
	}

	public void setCompetitions(List<Competition> competitions) {
		this.competitions = competitions;
	}

	public static class Competition {
		private String competition_id;
		private String title;

		public Competition(@JsonProperty("competition_id") String competition_id, @JsonProperty("title") String title) {
			this.competition_id = competition_id;
			this.title = title;
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
	}
}