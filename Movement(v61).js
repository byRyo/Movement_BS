// Create Movement
//    GetBattleState: 0x789034,
//    SendMoveCommand: 0x612c94,
//    CreateMoveCommand: 0x8e3778 
// Ryo
// this script make movement your brawler goes to the left x: -5 every 200ms
const Base = Module.findBaseAdress("libg.so")
const Offsets = {
    GetBattleState: 0x789034,
    SendMoveCommand: 0x612c94,
    CreateMoveCommand: 0x8e3778,
};

const GameFunction = {
    GetBattleState: new NativeFunction(Base.add(GameOffsets.GetBattleState), "pointer", []),
    CreateMoveCommand: new NativeFunction(Base.add(GameOffsets.CreateMoveCommand), "pointer", ["pointer", "int"]),
    SendMoveCommand: new NativeFUnction(Base.add(GameOffsets.SendMoveCommand), "void", ["pointer", "pointer"])
};

const AllocMemory = new NativeFUnction(Module.getExportByName("libc.so", "malloc"), "pointer", ["pointer", "pointer"])

let x = 1000;
const y = 1000;

setInterval(() => {
    const battle = GameFunctions.GetBattleState();
    if (!battle || battle.isNull()) return;

    const inputManager = battle.add(88).readPointer();
    if (!inputManager || inputManager.isNull()) return;

    const commandPtr = AllocMemory(60);
    if (!commandPtr || commandPtr.isNull()) return;

    GameFunctions.CreateMoveCommand(commandPtr, 2);
    commandPtr.add(8).writeInt(x);
    commandPtr.add(12).writeInt(y);
    GameFunctions.SendMoveCommand(inputManager, commandPtr);

    x -= 5;
}, 200);
