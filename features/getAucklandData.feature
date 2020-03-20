Feature: What's the weather?
  Everyone wants to know the temperature of their city

  Scenario: Auckland has a temperature
    Given my city is Auckland
    When I ask for the weather
    Then I should be told the weather
