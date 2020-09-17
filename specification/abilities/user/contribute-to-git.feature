Feature: Contribute to Git

  As a user
  I can contribute to files stored in Git
  to be able to collaborate with other Git users

  Rules:
  - the user wants to work on a file stored in a git repository
  - for start watching a file you choose a file from a local repository
  - saving a change creates a git commit
  - restore a version creates a git commit based on the restored version
  - publishing a document pushes it to Git

  Background:
    Given Sini, a user

  Scenario: Store history in Git
    Given a text file stored in a Git repository
    When Sini monitors it
    And saves a change
    Then Sini should see a new entry in the history
    And a git commit should be created

  Scenario Outline: Store history in Git
    Given a text file stored in a Git repository with <commits>
    And <entries> in the history
    When Sini <monitors> it
    Then Sini should see <result> in the history
    And <commits> should be available

    Examples:
      | commits       | entries       | monitors          | result        |
      | three commits | three entries | monitors          | three entries |
      | three commits | three entries | stops monitoring  | no entries    | 
      | no commits    | no entries    | starts monitoring | one entry     |

  Scenario Outline: Create commit for saving change
    Given a text file with the content "Hello Annika" stored in a Git repository
    And Sini opened the text file together with GitOffice
    And Sini changed the content of the document to "Hello Josua"
    When Sini saves the changes <saved> with a <type> description <text>
    Then a git commit should be created
    And its commit message should be <text>

    Examples:
    | saved      | type        | text                             |
    | internally | manual      | "Change name"                    |
    | externally | generated   | "Document updated automatically" |

  Scenario: Create commit for restoring version
    Given a text file stored in a Git repository
    And Sini saved three document versions in the history
    When Sini restores the second version of the history
    Then the change should be saved with the description "Restore document version 2"
    And a git commit should be created
    And its commit message should be "Restore document version 2"

  Scenario: Push to Git
    Given a text file stored in a Git repository
    And Sini saved three document versions in the history
    When Sini publishes the document
    Then all saved document versions saved as commits should be pushed to Git

