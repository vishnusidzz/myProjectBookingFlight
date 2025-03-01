Feature: Validating search flight home page

Scenario: User Clicks on Search with All details

Given Travel Website is open and asked details to search.
When User Selects From location "Bangalore", to Location "Dubai"
And Selects Date "2025-04-10"
And entered No of adults 4 and No of Child  3
Then Click on Search and validate all flights list as per the dates and locations.

Scenario: without All details Validate error code

Given Travel Website is open and asked details to search.
When User didnt select From location, to Location
And user Selects Date "2025-04-10"
And entered No of adults 4 and No of Child  3
And Click on Search button
Then It will throw an error and guides user to select From location and To location.

