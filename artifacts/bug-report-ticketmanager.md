# Bug Report — TicketManager (Sample)

- ID: TM-1427
- Title: Checkout confirmation intermittently shows blank page after payment success
- Severity: High (P1)
- Priority: High
- Environment: STAGE, Chrome 126, Windows 10
- Affected Area: Purchase Checkout → Confirmation

## Description
After successful payment, users are redirected to a blank page instead of the confirmation screen. Occurs intermittently (~15%). Console shows `TypeError: cannot read properties of undefined (reading 'orderId')`.

## Steps to Reproduce
1. Login as standard user
2. Add any event ticket to cart
3. Proceed to checkout and complete payment with test card 4111 1111 1111 1111
4. Observe post-payment redirect

## Expected Result
- User should see Order Confirmation with order details and email receipt notification banner.

## Actual Result
- Blank page loads; JS error in console referencing missing `orderId`.

## Frequency
- Intermittent, ~15% of attempts

## Logs / Evidence
- Console: `TypeError: ... undefined (reading 'orderId')`
- Network: `/api/orders/:id` 200 OK, response contains valid orderId
- Video: Attached (placeholder)

## Impact
- Users uncertain if purchase was successful; can lead to double charges or support tickets

## Suspected Cause
- Race condition: Confirmation page attempts to read `orderId` from client state before it is hydrated from API

## Workaround
- Hard refresh loads confirmation correctly

## Recommendations
- Add redirect wait for order fetch completion
- Guard null checks before rendering confirmation component
- Add E2E test to assert confirmation render post-payment

## Triage
- Owner: Web Team
- Status: Open
- Created by: QA
- Created on: YYYY-MM-DD
