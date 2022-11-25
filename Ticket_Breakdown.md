# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're
working on a new feature which will generate reports for our client Facilities containing info on how many hours each
Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including
  some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted
  by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability
for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for
them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail
for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free
to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets,
and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your
work.

## Your Breakdown Here

---

### Facility Assigned Agents Back End

1. Add new table `FacilityAgents`

Contains our internal db ids of the facilities and the agents as well as the new facility generated id for the agent.

Fields:

```sql
pk id: UUID
fk facility: UUID
fk agent: UUID
```

Estimate:

- Implementation: 2 hours
- Testing: 2 hours

2. Add PUT `/agents` endpoint

BODY:

```JSON
{
"facilityId": {FACILITY_ID},
"agentId": {AGENT_ID},
"facilityAgentId": {FACILITY_AGENT_ID}
}
```

- The endpoint will insert this information into the new table `FacilityAgents`

Estimate:

- Implementation: 2 hours
- Testing: 3 hours

---

### Assign Agent Front end

1. Add functionality for a facility to assign an agent a facility generated id

- Create new input in the front end with the function `assignAgentId`
  - Function uses the current user's facilityId contained in their user profile. Function takes in parameters of
    `agentId` and `facilityAgentId` which correspond to our internal DB id and the facility-provided id for the agent.
  - Function calls PUT endpoint `/facility-agent`

BODY

```json
{
"facilityId": {FACILITY_ID},
"agentId": {AGENT_ID},
"facilityAgentId": {FACILITY_AGENT_ID}
}
```

Estimate:

- Implementation 2 hours
- Testing 2 hours

---

### Generate Report Front End

- Add an input that takes in the facility's provided agent ID to generate a report.
- Add an optional parameter `facilityAgentId` to the `generateReport` function.
- The `generateReport` function will use the `facilityAgentId` if it is provided to call the current
  `reports/{FACILITY_ID}` endpoint.

Estimate:

- Implementation 2 hours
- Testing 2 hours

---

### Generate Report Back End

1. Add a new, optional query parameter of `facilityAgentId` to our GET `/reports/{FACILITY_ID}` endpoint.

2. Add a function in the endpoint to query the Shifts table for shifts worked by the specified agent if it is present in
   the query.

Estimate:

- Implementation: 2 hours
- Testing: 3 hours
