context('login test', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3000')
  })

  it('login-normal', ()=>{
    cy.get('.el-input__inner')
      .type('a6ec51f044f37104dbef3a539673b78f')
      .should('have.value', 'a6ec51f044f37104dbef3a539673b78f')

    cy.get('.el-button')
    .click()

    cy.url()
      .should('includes', '/main')
  })

  it('login-error', () => {
    cy.get('.el-input__inner')
      .type('123456')
      .should('have.value', '123456')

    cy.get('.el-button')
      .click()

    cy.url().should('includes', '/')
    cy.contains('错误')
  })
});
