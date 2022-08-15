import { verify } from 'crypto'
import { waitForDebugger } from 'inspector'
import loc from '../../locators/locteste.json'

describe('Teste API', () => {
    it('API teste', () => {
        cy.fixture('teste').should((testeFixturre) => {
            cy.request({
                method: 'GET',
                url: testeFixturre.api,
                failOnStatusCode: false
            }).as('response').should((response)=>{
                expect(response.status).to.equal(200),
                expect(response.body.data.list.name).to.equal(testeFixturre.api_list_name_validacao)
                cy.log("list name  -> " + response.body.data.list.name)           
            })
        })
    })

})

describe('Testes Web', () => {
    context('Login', () => {
        it('efetuar login', () => {
            cy.fixture('teste').should((testeFixturre) => {
                cy.visit(testeFixturre.url)
                cy.get(loc.LOGIN.LINK_MY_ACCOUNT).click()
                cy.get(loc.LOGIN.CAMPO_USER).type(testeFixturre.user)
                cy.get(loc.LOGIN.CAMPO_PASSWORD).type(testeFixturre.password)
                cy.get(loc.LOGIN.BOTAO_ENTRAR).click()
            })        
        })
    })

    context('Busca de Produto e Carrinho', () => {
        it('buscar produto', () => {
            cy.fixture('teste').should((testeFixturre) => {
                cy.visit(testeFixturre.url)
                cy.get(loc.HOME.CAMPO_BUSCA).type(testeFixturre.busca_produto)
                cy.get(loc.HOME.BOTAO_BUSCA).click()
                cy.get(loc.BUSCA.TEXTO_BUSCA_REALIZADA).contains(testeFixturre.busca_produto)
            })
        })

        it('selecionar produto, adicionar no carrinho, validar produto no carrinho e cheout passos de 1 à 5', () => {
            cy.fixture('teste').should((testeFixturre) => {
                //selecionar produto
                cy.log("selecionar produto")
                cy.get(loc.PRODUTO.BOX_PRODUTO).trigger('mouseover')
                cy.get(loc.PRODUTO.LINK_VER_PRODUTO).should('be.visible')
                cy.get(loc.PRODUTO.LINK_VER_PRODUTO).click({force: true})
            
                // adicionar produto carrinho
                cy.log("adicionar produto carrinho")
                cy.get(loc.PRODUTO.BOTAO_ADICIONAR_CARRINHO).click()
                cy.wait(15000) // aguarda carregar dialog
                cy.get(loc.PRODUTO.BOTAO_PROCESSAR_CHECKOUT).each((item, index,list) => {
                    if (item.text().trim() == 'Proceed to checkout') {
                        item.click()
                    }
                });

                // validar produrto no carrinho
                cy.log("validar carrinho")
                cy.get(loc.CARRINHO.BOTAO_CARRINHO).click({force: true})
                cy.get(loc.CARRINHO.BOTAO_VER_CARRINHO).click({force: true})
                cy.get(loc.CARRINHO.DESCRICAO_PRODUTO).contains(testeFixturre.busca_produto)
              
                // checkout carrinho 01.Summary
                cy.log("checkout carrinho 01.Summary")
                cy.get(loc.CARRINHO.BOTAO_PROCESSAR_CHECKOUT).click()

                // checout logim 02.Sign in
                cy.log("checkout login 2.Sign in")
                cy.get(loc.LOGIN.CAMPO_USER).type(testeFixturre.user)
                cy.get(loc.LOGIN.CAMPO_PASSWORD).type(testeFixturre.password)
                cy.get(loc.LOGIN.BOTAO_ENTRAR).click()

                // checkout endereço 03.Address
                cy.log("checkout endereço 03.Address")
                cy.get(loc.ENDERECO.BOTAO_PROCESSAR_CHECKOUT).each((item, index,list) => {
                    if (item.text().trim() == 'Proceed to checkout') {
                        item.click()
                    }
                });

                // checkout envio 04.Shipping
                cy.log("checkout envio 04.Shipping")
                cy.get(loc.ENVIO.CHECK_ACEITE).click()
                cy.get(loc.ENVIO.BOTAO_PROCESSAR_CHECKOUT).each((item, index,list) => {
                    if (item.text().trim() == 'Proceed to checkout') {
                        item.click()
                    }
                });

                // checkout pagamento 05.Paymentt
                cy.log("checkout pagamento 05.Paymentt")
                cy.get(loc.PAGAMENTO.DESCRICAO_PRODUTO).contains(testeFixturre.busca_produto)
            })

        })

    }) 
})