import {
    faker
} from '@faker-js/faker'


const name = faker.name.firstName() + ' ' + faker.name.lastName()
const email = faker.internet.email()
const phone = faker.phone.number('+31#########')
const subject = faker.random.words(3)
const message = faker.random.words(20)

describe('send a message', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Go to page', () => {
        cy.visit('https://automationintesting.online/')
    })

    it('Input the values', () => {
        cy.get('[data-testid=ContactName]').type(name)
        cy.get('[data-testid=ContactEmail]').type(email)
        cy.get('[data-testid=ContactPhone]').type(phone)
        cy.get('[data-testid=ContactSubject]').type(subject)
        cy.get('[data-testid=ContactDescription]').type(message)
        cy.get('#submitContact').click()
    })

    it('Check the form has successfully submitted', () => {
        cy.get('[data-testid=ContactName]').should('not.exist')
        cy.get('[data-testid=ContactEmail]').should('not.exist')
        cy.get('[data-testid=ContactPhone]').should('not.exist')
        cy.get('[data-testid=ContactSubject]').should('not.exist')
        cy.get('[data-testid=ContactDescription]').should('not.exist')

        cy.get('[class*=contact]')
            .should('contain', 'Thanks for getting in touch ' + name)
            .and('contain', subject)
    })

    it('Log into admin', () => {
        cy.visit('https://automationintesting.online/#/admin')
        cy.get('[data-testid=username]').type('admin')
        cy.get('[data-testid=password]').type('password')
        cy.get('[data-testid=submit]').click()
    })

    it('Go to messages', () => {
        cy.get('[class*=fa-inbox]').click()
        cy.get('[class*=messages]').should('contain', name).and('contain', subject)
        cy.get('[data-testid*=messageDescription]').contains(subject).click()
    })

    it('Check the modal contains all the inputted values', () => {
        cy.get('[data-testid=message]')
            .should('contain', name)
            .and('contain', email)
            .and('contain', phone)
            .and('contain', subject)
            .and('contain', message)
    })
})
