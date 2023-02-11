import {
    faker
} from '@faker-js/faker'


const firstname = faker.name.firstName()
const lastname = faker.name.lastName()
const price = faker.random.numeric(3)

const generatedDateSoon = faker.date.soon()
const generatedDateFuture = faker.date.future()

const checkinDate = generatedDateSoon.toISOString().slice(0, 10);
const checkoutDate = generatedDateFuture.toISOString().slice(0, 10);

let token, bookings, createdBooking, updatedBooking, partialUpdatedBooking

const credentials = JSON.parse('{ "username" : "admin", "password" : "password123" }');
const createBooking = 
JSON.parse(
    `{ \
    "firstname" : "${firstname}", \
    "lastname" : "${lastname}", \
    "totalprice" : ${price}, \
    "depositpaid" : true, \
    "bookingdates" : { \
        "checkin" : "${checkinDate}", \
        "checkout" : "${checkoutDate}" \
    }, \
    "additionalneeds" : "Breakfast" \
}`
)

const editBooking = 
JSON.parse(
    `{ \
    "firstname" : "${firstname} edited", \
    "lastname" : "${lastname} edited", \
    "totalprice" : ${price}, \
    "depositpaid" : true, \
    "bookingdates" : { \
        "checkin" : "${checkinDate}", \
        "checkout" : "${checkoutDate}" \
    }, \
    "additionalneeds" : "Breakfast" \
}`
)

const partialEditBooking = 
JSON.parse(
    `{
        "firstname" : "James",
        "lastname" : "Brown"
    }`
)

describe('send a message', () => {

    it('Generate a token and store it fore later use', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            headers: { 'Content-Type': 'application/json' },
            body: credentials
          }).then((resp) => {
            expect(resp.status).to.eq(200)
            token = resp.body.token
          })
    })

    it('Get all the bookings', () => {
        cy.request({
            method: 'GET',
            url: 'https://restful-booker.herokuapp.com/booking',            
          }).then((resp) => {
            expect(resp.status).to.eq(200)
            bookings = resp.body
          })
    })

    it('Create a booking', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            headers: { 'Content-Type': 'application/json' },
            body: createBooking           
          }).then((resp) => {
            expect(resp.status).to.eq(200)
            createdBooking = resp.body
            expect(createdBooking.booking.firstname).to.eq(firstname)
            expect(createdBooking.booking.lastname).to.eq(lastname)
            expect(createdBooking.booking.totalprice.toString()).to.eq(price.toString())
            expect(createdBooking.booking.bookingdates.checkin).to.eq(checkinDate)
            expect(createdBooking.booking.bookingdates.checkout).to.eq(checkoutDate)
          })
    })

    it('Update a booking', () => {
        cy.request({
            method: 'PUT',
            url: 'https://restful-booker.herokuapp.com/booking/' + createdBooking.bookingid,
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Cookie': 'token=' + token, },
            body: editBooking           
          }).then((resp) => {
            expect(resp.status).to.eq(200)
            updatedBooking = resp.body
            expect(updatedBooking.firstname).to.eq(firstname + ' edited')
            expect(updatedBooking.lastname).to.eq(lastname + ' edited')
            expect(updatedBooking.totalprice.toString()).to.eq(price.toString())
            expect(updatedBooking.bookingdates.checkin).to.eq(checkinDate)
            expect(updatedBooking.bookingdates.checkout).to.eq(checkoutDate)
          })
    })

    it('Partial update a booking', () => {
        cy.request({
            method: 'PATCH',
            url: 'https://restful-booker.herokuapp.com/booking/' + createdBooking.bookingid,
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Cookie': 'token=' + token, },
            body: partialEditBooking           
          }).then((resp) => {
            expect(resp.status).to.eq(200)
            partialUpdatedBooking = resp.body
            expect(partialUpdatedBooking.firstname).to.eq('James')
            expect(partialUpdatedBooking.lastname).to.eq('Brown')
            expect(partialUpdatedBooking.totalprice.toString()).to.eq(price.toString())
            expect(partialUpdatedBooking.bookingdates.checkin).to.eq(checkinDate)
            expect(partialUpdatedBooking.bookingdates.checkout).to.eq(checkoutDate)
          })
    })

    it('Delete created booking', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://restful-booker.herokuapp.com/booking/' + createdBooking.bookingid,
            headers: { 'Content-Type': 'application/json', 'Cookie': 'token=' + token, },          
          }).then((resp) => {
            expect(resp.status).to.eq(201)
          })
    })
})
