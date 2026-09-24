const content = `kkkkkkkkkkkkkkkxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxxxxxxxxxxxxddddddddddoooooooooooooooooooooooooooooolllllllllllllllllllllllccccccccccccccccccccccccccccc
OOOOkkkkkkkkkkkkkkkkkkxxxxxxxxxxxxxxxxxxkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOOOOOOOOOOOOkkkkkkkkkkkkkkkkkkkkxxxxxxxxxxxdddddddddddooooooooooooooooooooooooooooooooooooooooooooollllllllllllllllllllllllllllcc
OOOOOOOOOOOOOOkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkkkkkkkkkkkkkkxxxxxxxxxxddddddddddddddddoooooooooooooooooooooooooooooooooooooooooooooooooolllllllllllllll
00000OOOOOOOOOOOOOOOOOOOOOkkkkkkkkkkkkkkkkkkkkkkkOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkkkkkkkkkkkkxxxxxxxxxxxxddddddddddddddddddddddddddddddddoooooooodoooooooooooooooooooooooooooooooo
00000000000OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO0000000OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkkkkkkkkkkkkkxxxxxxxxxxxxxxddddddddddddddddddddddddddddddddddddddddddddddddooooooooooooooooo
K00000000000000OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO000000000000kxO00000000000kkO0000000000OOOOOOOOOOOOOOOkkkkkkkkkkkkkkxxxxxxxxxxxxxxxxxxxxddddddddddddddddddddddddddddddddddddddddddddddoooooooo
KKKKKKK0000000000000000000OOOOO00OOOO000000OO000000000000000000000000Oc;dOO00xok000Oo;d00000000000000000OOOOOOOOOOOOkkkkkkkkkkkkkkkxxxxxxxxxxxxxxxxxxxxxxxxxxddddddddddddddddddddddddddddddddddddddddddd
KKKKKKKKKKKKK00000000000000000000000000000000000000000000000000000000k;.',;;:'.;::;,..;k00000000000000000000OOOOOOOOOOOkkkkkkkkkkkkkkkkkxxxxxxxxxxxxxxxxxxxxxxxxxxxxxddddddddddddddddddddddddddddddddddd
XXXKKKKKKKKKKKKKKKK00000000000000000000000000000000KK000KKKKKKKKKKKKKO;.'.............;x0000000000000000000000000OOOOOOOOOOOkkkkkkkkkkkkkkkkkkkkxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxddddddddddddddddddddddddd
XXXXXXXXXKKKKKKKKKKKKKKKKKK0000000000000KK000KKKKKKKKKKKKKKKKKKKKKKK0x;..,,,,,,,,,'...ckk0KKKKK00000000000000000000OOOOOOOOOOOOkkkkkkkkkkkkkkkkkkkkkkkkkkxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdddddddddddddddd
XXXXXXXXXXXXXXXXKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKOx:.ckk000000Oxl'.cOkk0KKKKKKKKKKK000000000000000OOOOOOOOOOOOOkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxddddddd
XXXXXXXXXXXXXXXXXXXXXKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKXXKkk:.dKkOKKKKK0kOl.c0Kkk0KKKKKKKKKKKKK00000000000000OOOOOOOOOOOOOOOkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKKKKKKKKKKKXXXXXXXXXXXXXXXXXXXXXXXX0kOc.dX0kOXKKKOOKo.:0KKkkKKKKKKKKKKKKKKK000000000000OOOOOOOOOOOOOOOOOOOkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxkkxxxxxxxxxxxxxxxxxx
NNNNNNNNNNNNNNNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXOO0c.dXKOk0XX0k0Ko.:0KKKkkKXKKKKKKKKKKKKKKKK00000000000OOOOOOOOOOOOOOOOOOOOOkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxxxxxxxxxxxx
NNNNNNNNNNNNNNNNNNNNNNNNNNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKkKO;.l0KKOkKKOOK0l.;OKKKKkkKXXKKKKKKKKKKKKKKKK00000000000OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXOOXk,..,;:::c:;:;,..,kXKKKKkkKXXXKKKKKKKKKKKKKKKK000000000000000OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
WWWNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXXXXXXXXXXXXXXXXXXXXXXXXXXXNKO0Xk,.......'.......,kXKKKXKOkKXXXXXXXXKKKKKKKKKKKKKK00000000000000000OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkkkkkkkkkkkkkkkk
NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXXXXXXXXXXXXXXXXXXXX0OKXk,...',,',,'.....,kXKKKXXKkkKXXXXXXXXXXKKKKKKKKKKKKKKK00000000000000000000000000000000OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkkkk
XXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXXXXXXXXXXNKO0XXk,..oO00kkkxkkc..,kXXXXXXXKOkKXXXXXXXXXXXXKKKKKKKKKKKKKKKKKK0000000000000000000000000000000000000OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
00000000KKKKXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXNN0OXXXk,.;OXXXOOKOkXO;.'xXXXXXXXXKOkKXXXXXXXXXXXXXXXXKKKKKKKKKKKKKKKKKKKK0000000000000000000000000000000000000000000OOOOOOOOOOOOOOOOOOOOO
OOOOOOOOOO0000KKKKKKXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXO0NXNk,.:0XX0OKXKkO0c.'xXXXXXXXXXXOxk0XXXXXXXXXXXXXXXXXKKKKKKKKKKKKKKKKKKKKKK0000000000000000000000000000000000000000000000000OOOOOOOOOO
00O00000000OO00000KKKKKXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN0OXNXXk,.:0NKO0XKXKOx:..xXXXXXXXXXXXOxk0XXXXXXXXXXXXXXXXXXXXKKKKKKKKKKKKKKKKKKKKKKKK000KKKKKKKK0000000000000000000000000000000000000000OO
KK00KKKKKKKKKKK0KKKKKKXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXO0NXXXx'.;OX00XXXXXKd,..xXXXXXXXXXXXXX0xOXXXXXXXXXXXXXXXXXXXXXXXXKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK00000000000000000000000000000000000
KK00KK0000KKKKKKKKKKXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN0OXNXXKo'..cooxxxxxxdl;..lKXXXXXXXXXXXXX0xOXNXNNXXXXXXXXXXXXXXXXXXXXXXXXKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK00KKKKKK0000000000000000000000000000
KKKKKKK000000000KKKKKKKXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXO0NXXXKc...............'.cKNXXXXXXXXXXXXXKxkXNNNXXXXXXXXXXXXXXXXXXXXXXXKKKKKKKKKKKKK0KK00000000000000000000000KK00000000000000000000000000
KKKKKKKKKKKKKKKKKKKKKKKKKXXXXXXNNNXNNNNNNNNXXNNNNNNNNNNNNNNNNKOXNXXXKc...............''cKNXXXXXXXXXXXXXXKxkKNXXXXXXXXXXXXXXXXXXKKKKKKKKKKKKKKKKK000000000000000000000OOOOOO0000OOOOOkkOO000OOkkkOOOOOOOO
NNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNXXNNXNXKKXXKKXNXXXNNNNNNNNNXO0XXXXNKl.....,;;;;;,.....lKXXXXXXXXXXXXXXXXKkd0NXXXXXXXXXXXXXXXKKKKKKKKKK000KKKKK0000000000000000000OOOOOkkOOOOOkkkkkkkkkkOOOkkxxxkkkOOOOO
NNNNNNNNNXNNNNNNNNNNNNNNNNNNNNNNNNNNNNN0oloocdXNNNNNNNNNNNNN0OXXXXXXKl...,xKKKKKK0k;...:OXXXXXXXXXXXKXXXXXXxd0XXXXXXXXXXXXXXXXKKKKXXXKKKKKKKKKKKKKKKKKKKKKKKKKKKK0000000000000000000000000000OOOOO000000
NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN0dOKKxdKNNNNNNNNNNNNXOKXXXXXXKl...lKXKXKKKKKo...:kkKXXXXXXXXXXXXXXXXKOdkXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK00000000000000
NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNOok0Odo0NNNNNNNNNNNN00XXXXXXXKl...oXKKXKKKKXd'..:0kkXXXXXXXXXXXXXXXXKX0dkXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK00000
NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNO:coo:l0XNNNNNNNNNNKOKXXXXXXXKl...oXXKXKKKKXx'..:0KkkKXXXXXXXXXXXXXXKXX0kxKXXXXXKKXXXXXXXXXXXXXXXXXXXXXXXKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK00
NXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNklONXxo0XNNNNNNNNNX00XXXXXXXXKc...oKKKKKKKKXx'..:0XKxkXXXXXXXXXXXXXXKXXKXxo0XXXXXXXXXXXXXXKKKXXKXXKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK00000
0OOO0KKKK0KXXXXXNNNNXXNNNNNNNNNNNNNNNNNkldOkolOXXNNNNNNNNK0KXXXXXXXKOc...lKKKKKKKKKo'..;0XXKkOKXXXXXKXXXXKXKXXKXKkdOXXXXXXXXXXXXXXKKXKKXKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK0KKKKK00000000
kkkkkkkkkkkOOOOO0000OOO00KKKKXXXXNNNNNNk::ll:cOXXNNNNNNNX0KXXXXXXXK00l...:O0000000Ol...:0KKKKkkKXXXXKXXXXKXKXXKXKK0oxKXXXXXXXXXXXXXXXXXXKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK000000000000000
kxxxxxxxxxddddxxxxkxxxxxxxxxxkkkkOO0XNNklkKKdlOXKXNNNNNX00XXXXXXXX00Ko'...',,,,,,,'....:0KKKK0kOKXXXKXXXXKXKXK0K00KOox0XXXXXXXXXXXXXXXXXXKXKKXK0KKKKKKKKKKKKKKKKKKKKKKKKKKKKK000000000000000000000000000
doollcccccccccccclodxxxxxxxxxxxxxxdxkO0dlkXKxlOXKXNNNNNK0XXXXXXXX00XKo'................;0XKKKK0kkKXXKXKK000OOOkOkkOkkdlx00000000OOOOOOO0000OOOOOkkOOkkkkkkkxdxkOOO0000KKKKKK000000000000000000000000OOOO
lllcccccccccccccccccloodddddddxxdddddxdl:coocckKKKXNNXK0KXXKXXXK00KK0o'................;OK00000Odx00O0OOOOOkOOkOkkOkkOd:dOOOkkkkxxxddddxkkxxxxddoddddooooooollllllloooodxxxxxkOOOOOkkkkkOkkkkOOOkkkkkkkk
cccclccccccccccccccccccccclllooddddddddl::clc:oxxkO00OkkO000KK0kO0000o,....;cccc:;'....,xOOOOOOOkdxOOOOOOkOkkkxkxxOxxOkdlokkkkkxxxddddddxxdddddooooooodddooolllllccllllcccccccclloooooooooollllllllllodd
cccccccccccccccccc:ccccccc:::::cclooooolcloolclooooddoodddxxkkxxxkxxxl,...:O0Okxxxo'...'odddxxxxddlodkkOOkOkkkxkxxOkxkxdxlcoxxkxddddddddddooooloollllloooollllllclloddoollcccccccccccccccccccccccccccclo
ccccccccccccccccccccccccccc:::::::ccclllcllllclolloooooooooooddddddddc,. .lxxdddddd:....lollllllccc::clxOkOkkkkOkkOkxOxxOkocoxkxxxxxdxxxxdddooodoooooooooollllooooooooloolllllllllllllllllclllccllllcccc
ccccccccccccccccccccccccccc:::::cccc::cclllllloolollloollllllooooooodc,. .lxddoooooc....collllcccccccc:loodxxkxxxxkxxOkxkkxdolxxxxxxddddddddoooooodxdoooooolllllllllcccccccccccccccc::::::::::::::::::::
cccccccc:ccc:::c:::::::::::::::::ccc:::cc:;;;:::cclllllcclllcclllclloc,..'coollllllc'. .cllccccccccc:cc;:::::c::::ccccclddoooc:loolllllllccccccccclllcccc:::::::::::::::::::;;;;;;;;;;;;;;::;;;;;;;;,,,,
cccc:::::::::::::::::::::::::::::::::;;:;;,,,;:::,,;:ccccccc:ccllc:cc:,. 'collllllll'. .:lccccclccc:::cc::::::;;;;::;;,,coloolccclllllccccccc:::::::::;;::::::;;;;;;;;;;;;;;;,,,,,,,,,,,,,;;,,,,,,,,,,,,
::::::::::::::::::::::::::::::::::;;;;;::;,;,;;;;;;;,;::;;:cllcccc::c:,. .cllooloool'. .colllllllllc:ccclc::::;::;::;:;,:llloollccllllcccccccc:::::::::cccc::::::::::::;;;;;;;;;;;;;;,,,,,,,,,,,,,,,,'''
;;;;;;:::;;;;;;;;:::;;;;;;;;;;;;;;;;,,;;:;,,;,,,,;;:cllc:,'';:cllc::c:,. .:clllloool'. .collllllloollooldl:cooloolllcllcllccccccl:;ccccc::ccccc::::::;;;;;;;;;;;;;;;,,,,,,,,,,,,,'''''''''''''''''''''''
,,,,;;;;;,,;;;;;;;;;;;;;;;::;;;;;,,,,,,;:;,;,,,,,,,;ldol:::::;'';:ccc;'...;c:;;:::::;. .;;clcllllllccllclccccccc::::::::::;;:;;::;;c::::;;;;;,,,,,,,,,,'''''''''''''....................................
,,,,,,,,,,,,,,,,,,,,,,,,,,;,,,,,,'''',,;;,,;,;,,,,;;;::c:cdkxdo:,'.;;,...;;,,,;,'',,...''':c::cc::;;;:;;;;;::::;;,;,,;;,;;;;;,,,;,,;:;;;,''''''''''''''''...............................................
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,,,;;:clooddooooodddddolc;,. .';;::;,'',;:;;,,,;:::ccc::;:::::;;;;:;,;;,,,,'''',,'''',,,,',,,,,'''''''''''....................................................
ccccccccccccccccccccccccccccccccccccccc::;;;,;;:cclllooooooooooooddol' .,,'';:::,,,,',,,,'..,:::;;;::::::;;:;:::;,;;,,,,''''''''..'...';:,''''''''''''''................................................
llolllllllllllcllllccccccllccllccccccccc::;;,,,;;::cccccllllllllllllo:...''''',,,;c:;;,,''',::,..';ccc:::;;;;;:c:,,;;;;,,,,,,,''''''...';:,.............................................................
oooolllllllllllllllccccclllcccccccccc::::::;;,,,,,;;::::cc:ccccccclll:.. .;:,''...',;:c:;,,''',;;,;:;,'',;:;::;cc,,;;;;;;,,,,,,,,,,,''''',;,''.............................................''...........
olllolllllllllllcccccccccccccccccc:cc:::::;;;,,,,,,,,;;:::::ccccccccl:.. .:;..;;,''...,,;:c;,,,'',,,;;;,;:;,,,;::::;;;;;;;,',,,,,,',,,',,'';:;,'''......................................................
lllllllccccccccllccccccccccccccccccccccccc::;;;;,,,;;;;;:::cccccccccc:..  ..':cc:;.......',;:::;;,.....,;,::'...',c:;;;;;,,,,,,,,,,,''''','';c:,'''.....................................................
lccccccccccclccccllllllccccccc::::::c:::::::;;;;:;;;,,,,,;;;;;;:::::c;..   ........ ..''''.'',;;:c:;,,,....,,..',..,:;;:::;;,,',,,,,,,''''''',::,'''''''................................................
ccccccccccccccc::cccccccccccccc:c:::::::c::ccccll:;;;,'',,,;;:::ccccc:..   .,::::,..   .,,,..'..,,;::c:,,'.....,;;;;:;..';;'';;,,,,,,,,''''',,,,;;,'''..................................................
lllllllccccccccccc:::cccc::::c::::::::::::;;,,,,,,''''',,,,,,;;::cccc:.. .;,.';;..,:.   ,c:;;'.....''',::;;;'.....',:c;,'',.':;;::;'''.',,,''''',;:,'''';oc.............................................
ccllccccccc:::::::::::::::::::::::::::;:::;;;;,,''''''''''',,,,,;;;::;.. .:l:.  .;cc'   'cc::;;,''..''''.,:;;,,;,'....,::lx;..  ....''',,'''','''';:;,;cod;  ......''......'............................
ccc::cc::::::::::::::c:::ccccc:::::::::::::::;;,,,,,,''''''''',,;:::c:.. .;c,....':c'   ':::::::;;,';,....'.';;::;;;,..,:lx:.. .'.........,,,;:;;,,;;';x0d.   .',,''''''',,,,,''''''''''''..............
llccc::ccccccccccccccccc:ccccccccccccc::::::::;;,,,,,,'''''''',,,;;;:;.. ....':c;..'.   'c::::::;;;:::,''.'....';:;::;;oolo,.  .;:;,'.....,;;:cc:c;,'.'x0x...  .;,,,,,,,,'''''''........................
lcc::::ccccccc::::::::::::cccccccc::::c::;;;::;;;;;,,,''''.'''',',,,;;..    .''','.     '::::::;:::;;;;;;,;;....'..';::dlcl.    ...,;;;,'.....',,::;,,:dkd'..  .,;,,,,'','.'''''........................
cc:::::::::::::::::::::::::::::cc::::::;;;;;;;;;;,,'''''''''''''.''',:,.   .''..''''.   .;:::;;:::::::;;;;::,.''....','oddl. ...   ....','..  .  .....,,;,..... ..''''''''..............................
c:::::cc:::::;;;:::::;;;;;;::;::;;;;;;;;;;,,,,,,,,''..'''',,,''...'';c;.  .;:;;:::c:.   .,c::::::::::::oxxl:;;cc'..'...lkkl. '::;'....'..      .....   .  ..,'....'''''''''.............................
::::::cc:;;;;;;;;:::::;;;,;;;;;;;,,,,;;;,,,,,,,,,,,''',,''''''''''''lo:.   ..........    .,;;;;;;;;;;;:oxkkxl:cc:,,'...oO0o.'::;;cl:,''.. ......;:cc,.    .,,...;cc::;;,''..............................
::c:::::c:;;;;;:::::;;::;;;;;;;;;;;;;;;,;,,,,,,,,,'',;;,'....'''''';od;.                 .';;;;:::::::cokOkdlc:,';,...'d00d',;:c::c:cl:;'..........,:::;,.......';;:lllllc;'............................
clc:::::::::;;;;;;;;;::;;;;;;;,,;;;;;,,',,,;:;,,''',,,,',,,'''.....,od;. .                 ....:cc:;,;,,:ldxdol;,;;'..'d00d,'.';;cc:cc:clc:,..........',::;,,'.....',;;:cllcclc:'.......................
:::::;,;;;:::;;;;;;;;;;;;,,;;;,,;;,;;,'',;;:;;,;;;,''''cdoc;,'.....'od;......................  ..       ...;:;;,,,,''',xK0d,;'....';lc:cc::l:,;,'..........,:::;,.......,,,;clooool:;,..................
;,,;;,,,,;;,,,;;;;,;,,,,,,;;;;;;;:cc:;,,;;;,,,,,,,,,,',,;,,;,,''................                       ...............,kNXo,:;....',,..,:::c;.:lc:;'..........';c::;,.......',;;:loooolc;,,....'........
;,,,;;;;,,,,,,,,,,,;;::::;;;;;;;:::;;;:;,,;,,,,,,;;,;;,'''.....  ...   .        ....     .............'''''''''''',''';OWXo';;;;,;..''...'::::lc:cl;;c;.............,;,..'.......',;:cllllllc;,'........
cc:;,,;;;;,,,,;;;;::;;::;,,,,,,,;;,,,;;,,;;,,,,,',,'''...',''......'...... .........'.  .....'''''''''''''''''',,,,,,';OWXl',..',c:'',,......;lcccc'.:oc:;'... .........,:::ccc;.....';;::cllllc:;,,''''
;;;;;,;::;,,,;;,,:ccc:,''','''',,,'';;'.,,;;'.,,'''...'',''...'......'........... ...........''''''''''''''''''''''''.;OWXl',... ..,:;:;........;::::c:;cll:,,.............,oOOo.    ....',;;:cllllool:;
;;::;,;;,,,,;;;;;;:c:;,''',,''''''',,,,,'''''',;,..''...'..',;,......''.. ....................'',,'''''''''.'''''''''':OWXl',... .. ..,c;'....''...'clc::c;;cl:;;....  .....lOOd...      .....',,;:cllll
:;;;;;,;:;,',,,;;,,,;,,,'''''',,',,,,,,'..''',''..''';,'''',;;'...............................''',,,,,'''',''''''''''.:ONKl',... .. .  ..:c;,,'.....''.':lc::c;:lc:;'...'do',xOo'..   .:;'.   ....',;;::
;,',,;,;;::;;:c:,,;;,,,''',;;,,,,,,''',,,,,'''..',;,,;,'''''..'''................. ...........''''''''''''''''.''''''':0NKl',...... .  . .,::c:'',...'....'coo:;;cccl:::cOx..dkl'.    .,;:::;'.   .....'
;;,,,,;;;:;,',cll:,,'''''',,,,'''''',,,''',;;,'.'''''''''..'',,'.................  .....................''''..'.....'.:0NKc',...... .  ....,;,:col.........;:;,:loc,,:llx0x.'d0o.     .....';cc:;'.  ..,
,,,,,,,''.',,,;cc,.'..,;'',;:,'..,;,'''..,;;,'.....,,,'...,;;;,..................    ..................''''...........:0NKl,;......... ..'..;;'':ll:'.....'',.. ,cddc:;;xKd.,k0o.          .....;ll:.  . `;

export function HeroAscii() {
	return (
		<div className="flex justify-center overflow-hidden">
			<pre
				className="text-muted"
				style={{
					fontFamily: 'monospace',
					fontSize: '4px',
					lineHeight: '4px',
					whiteSpace: 'pre',
					margin: 0
				}}
			>
				{content}
			</pre>
		</div>
	);
}
