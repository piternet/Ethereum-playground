web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);

contractInstance = VotingContract.at('0xe348890cc2c09c5022b408d85af6270510a7f225');
candidates = {'Peter' : 'c-1', 'Sam' : 'c-2', 'John' : 'c-3', 'Adam' : 'c-4'};

$(document).ready(function() {
	for (let key in candidates) {
		let name = candidates[key] + '-name', val = candidates[key] + '-val';
		let votes = contractInstance.totalVotesFor.call(key).toString();
		$('#'+name).html(key);
		$('#'+val).html(votes);
	}
});

$("#vote-btn").click(function(event) {
	let voteFor = $("#vote-name").val();
	contractInstance.voteForCandidate(voteFor, {from: web3.eth.accounts[0]}, function() {
		let votes = contractInstance.totalVotesFor.call(voteFor).toString();
		let val = candidates[voteFor] + '-val';
		$('#'+val).html(votes);
	});
	$("#vote-name").val("");
});