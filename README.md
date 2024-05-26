# projeto_banco

## features
- criar conta
- fazer transferência entre contas

### database postgresql

### tables
    contas
    transferencias
### fields contas
        numero_conta
        cliente
        idade
        saldo
### fields transferencias    
```
    transferencia_id
    num_conta_send
    num_conta_receiver
    valor_transferido
    createdAt
    transf_efetivada
```

### fields agendamento
```
    agendamento_id
    data_hora
    transferencia_id
    agendamento_efetivado
```


### husky / eslint / prettier
### postman / insomnia
### docker
### swagger
