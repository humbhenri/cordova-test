/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function () {
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function () {
    app.listaContatos();
  },

  listaContatos: function (pesquisa) {
    function onSuccess(contacts) {
      $('tbody').html('');
      $(contacts).each(function (index, value) {
        let conteudo = `<tr><td>${value.displayName}</td><td>${value.phoneNumbers[0].value}</td></tr>`;
        $('tbody').append(conteudo);
      });
    }

    function onError(contactError) {
      console.log(JSON.stringify(contactError));
      alert(contactError);
    }

    var options = new ContactFindOptions();
    options.filter = pesquisa || '';
    options.multiple = true;
    // options.desiredFields = [navigator.contacts.fieldType.id];
    options.hasPhoneNumber = true;
    var fields = [
      navigator.contacts.fieldType.displayName,
      navigator.contacts.fieldType.phoneNumbers
    ];
    navigator.contacts.find(fields, onSuccess, onError, options);
  },

  salvaContato: function () {
    let nome = $('#nome').val();
    let telefone = $('#telefone').val();
    let myContact = navigator.contacts.create({
      'displayName': nome,
      'phoneNumbers': [{
        value: telefone
      }]
    });
    myContact.save((contact) => {
      alert('Contato adicionado com sucesso');
      $('#nome').val('');
      $('#telefone').val('');
      app.listaContatos();
    }, (error) => {
      console.log(error);
      alert('Erro ao adicionar o contato :(');
    });
  },

  pesquisaContato: function () {
    let pesquisa = $('#pesquisa').val();
    app.listaContatos(pesquisa);
    $('input').blur();
  },
};