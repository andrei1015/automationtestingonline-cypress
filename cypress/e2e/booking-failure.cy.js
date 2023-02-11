import {
    faker
} from '@faker-js/faker'

const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const email = faker.internet.email()
const phone = faker.phone.number('+31#########')

describe('failed booking (invalid first name)', () => {
    it('Go to page', () => {
        cy.visit('https://automationintesting.online/')
    })

    it('Input fields', () => {
        cy.get('[class*=openBooking]').first().click()

        cy.get('[name=lastname]').type(lastName)
        cy.get('[name=email]').type(email)
        cy.get('[name=phone]').type(phone)
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').should('contain', 'Firstname should not be blank').and('contain', 'size must be between 3 and 18')
    })

    it('2 letter name check', () => {
        cy.get('[name=firstname]').type('ad')
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').should('not.contain', 'Firstname should not be blank').and('contain', 'size must be between 3 and 18')
    })

    it('19 letter name check', () => {
        cy.get('[name=firstname]').clear().type('teesttesttesttesttes')
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').should('not.contain', 'Firstname should not be blank').and('contain', 'size must be between 3 and 18')
    })
})

describe('failed booking (invalid last name)', () => {
    it('Go to page', () => {
        cy.visit('https://automationintesting.online/')
    })

    it('Input fields', () => {
        cy.get('[class*=openBooking]').first().click()

        cy.get('[name=firstname]').type(firstName)
        cy.get('[name=email]').type(email)
        cy.get('[name=phone]').type(phone)
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').should('contain', 'Lastname should not be blank').and('contain', 'size must be between 3 and 30')
    })

    it('2 letter name check', () => {
        cy.get('[name=lastname]').type('ad')
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').should('not.contain', 'Lastname should not be blank').and('contain', 'size must be between 3 and 30')
    })

    it('19 letter name check', () => {
        cy.get('[name=lastname]').clear().type('teesttesttesttesttesteesttestte')
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').should('not.contain', 'Lastname should not be blank').and('contain', 'size must be between 3 and 30')
    })
})

describe('failed booking (invalid email)', () => {
    it('Go to page', () => {
        cy.visit('https://automationintesting.online/')
    })

    it('Input fields', () => {
        cy.get('[class*=openBooking]').first().click()

        cy.get('[name=firstname]').type(firstName)
        cy.get('[name=lastname]').type(lastName)
        cy.get('[name=phone]').type(phone)
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').should('contain', 'must not be empty')
    })

    it('only username email check', () => {
        cy.get('[name=email]').type('username')
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').and('contain', 'must be a well-formed email address')
    })

    it('username@ check', () => {
        cy.get('[name=email]').clear().type('username@')
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').and('contain', 'must be a well-formed email address')
    })

    it('username@domain check', () => {
        cy.get('[name=email]').clear().type('username@domain')
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').and('contain', 'must be a well-formed email address')
    })

    it('username@domain. check', () => {
        cy.get('[name=email]').clear().type('username@domain.')
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').and('contain', 'must be a well-formed email address')
    })
})

describe('failed booking (invalid phone)', () => {
    it('Go to page', () => {
        cy.visit('https://automationintesting.online/')
    })

    it('Input fields', () => {
        cy.get('[class*=openBooking]').first().click()

        cy.get('[name=firstname]').type(firstName)
        cy.get('[name=lastname]').type(lastName)
        cy.get('[name=email]').type(email)
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').should('contain', 'size must be between 11 and 21').and('contain', 'must not be empty')
    })

    it('10 digit number check', () => {
        cy.get('[name=phone]').type('1234567890')
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').should('contain', 'size must be between 11 and 21').and('not.contain', 'must not be empty')
    })

    it('22 digit number check', () => {
        cy.get('[name=phone]').clear().type('1234567890123456789012')
        cy.get('[class*=book-room]').contains('Book').click()
    })

    it('Check the correct errors appear', () => {
        cy.get('[class*=alert-danger]').should('contain', 'size must be between 11 and 21').and('not.contain', 'must not be empty')
    })
})
