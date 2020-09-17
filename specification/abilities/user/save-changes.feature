Feature: Save Changes

  As a user
  I can save the changes I made to a document
  to keep it up to date

  Rules:
  - A document contains only text content
  - Unsaved changes in the document are lost
  - The content last saved in the document is what the user can see

  Scenario: Save changes made in a document
    Given Sini, a user
    And Sini opened a document with the content "Hello Annika" in it
    When Sini changes the content to "Hello Josua"
    And saves it
    Then the document should be saved with content "Hello Josua" in it

   Scenario: Saving changes in content with picture in it
     Given Sini, a user
     And Sini inserted a picture in the document
     When Sini wants to save it
     Then the document should not be saved
     And Sini should be able to see that it wasn't possible to save the document
     And that the content of the document can only contain text

  Scenario: Seeing latest version of the saved document
    Given Sini, a user
    And Sini changed the content of the document from "Hello Annika" to "Hello Josua"
    And she saved it
    When Sini opens the document
    Then Sini should see the content "Hello Josua" in it

  Scenario: Changing the content without saving
    Given Sini, a user
    And Sini changed the content of the document from "Hello Annika" to "Hello Josua"
    And she didn't save it
    When Sini opens the document
    Then Sini should see the content "Hello Annika" in it

