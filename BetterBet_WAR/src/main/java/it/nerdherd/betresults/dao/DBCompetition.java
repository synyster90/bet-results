package it.nerdherd.betresults.dao;

import org.codehaus.jackson.annotate.JsonProperty;

public class DBCompetition {
	@JsonProperty("_id")
	private String id;

	@JsonProperty("nome")
	private String nome;

	@JsonProperty("country_code")
	private String country_code;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCountry_code() {
		return country_code;
	}

	public void setCountry_code(String country_code) {
		this.country_code = country_code;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}
