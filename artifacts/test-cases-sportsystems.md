# Test Cases — SportSystems (Sample)

| ID | Title | Preconditions | Steps | Expected Result |
|---|---|---|---|---|
| TC-LOGIN-001 | Valid user can log in | User exists | 1. Go to Login\n2. Enter valid email/password\n3. Click Login | User lands on Dashboard within 2s; session cookie set; user name visible |
| TC-LOGIN-002 | Invalid password shows error | User exists | 1. Go to Login\n2. Enter valid email + wrong password\n3. Click Login | Inline error: "Invalid credentials"; no session cookie created |
| TC-EVENT-001 | Create event with required fields | Authenticated as Manager | 1. Open Events\n2. Click New\n3. Fill title/date/capacity\n4. Save | Event appears in list; API returns 201; UI success banner |
| TC-TICKET-003 | Purchase flow happy path | Event with seats exists | 1. Select event\n2. Choose 2 tickets\n3. Checkout\n4. Confirm | Order confirmation page; email sent; tickets reduced by 2 |
| TC-REPORT-002 | Dashboard KPIs load | Authenticated; data exists | 1. Visit Reports\n2. Observe KPIs | All KPI widgets render within 3s; no console errors |
| TC-UI-ACCESS-004 | Focus states visible for nav items | Any | 1. Tab through navbar | Visible focus outline; meets WCAG 2.1 AA |

Notes:
- Tagging: @smoke for LOGIN-001, EVENT-001; @regression for others
- Data cleanup: remove created events post-run
