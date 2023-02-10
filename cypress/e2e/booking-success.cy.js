import { faker } from '@faker-js/faker'

const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const email = faker.internet.email()
const phone = faker.phone.number()

const randomNumber = faker.random.numeric() // using this to move off of the current month to try to avoid collisions with other people, their DB resets every 10 minutes, in a normal environment I would clean up the booking I create to make sure there are no issues

describe('make a successful booking', () => {
  it('Go to page', () => {
    cy.visit('https://automationintesting.online/')
  })

  it('Input fields', () => {
    cy.get('[class*=openBooking]').first().click()

    cy.get('[name=firstname]').type(firstName)
    cy.get('[name=lastname]').type(lastName)
    cy.get('[name=email]').type(email)
    cy.get('[name=phone]').type(phone)
  })

  it('Select period', () => {
    for(let n = 0; n < randomNumber; n ++){
      cy.get('[class*=rbc-btn-group] button').last().click()
    }
    // cy.wait(500)
    // cy.get('[class*=rbc-day-bg]').not('[class*=rbc-off-range-bg]').eq(2).trigger('mousedown', { force: true })
    // cy.wait(500)

    // // cy.get('[class*=rbc-day-bg]').not('[class*=rbc-off-range-bg]').eq(5).trigger('mousemove')
    // // cy.wait(500)

    // cy.get('[class*=rbc-day-bg]').not('[class*=rbc-off-range-bg]').eq(5).trigger('mousemove', { force: true })
    // .trigger('mouseup', { force: true });

    cy.get('[class*=rbc-day-bg]').not('[class*=rbc-off-range-bg]').eq(0).trigger('dragstart');
    cy.get('[class*=rbc-day-bg]').not('[class*=rbc-off-range-bg]').eq(7)
  .trigger('dragend');
  // cy.wait(1000).then(() => {
  //   cy.get('[class*=book-room]').contains('Book').click()
  // })

  })

})
