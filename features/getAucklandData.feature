Feature: What's the weather?
  Everyone wants to know the temperature of their city

  Scenario: Auckland has a temperature
    Given my city is Auckland
    When I ask for the weather
    Then I should be told the weather
    And the weather should contain temperature and timezone

  Scenario: AEIOU is not a city
    Given my city is AEIOU
    When I ask for the weather
    Then I will be told about the error