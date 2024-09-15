import { Copy, RotateCw } from "lucide-react";
import { FC, useState, useEffect } from "react";

const PassWordGenerator: FC = () => {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(12);
  const [strength, setStrength] = useState<string>("Weak");
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [useUppercase, setUseUppercase] = useState<boolean>(true);
  const [useLowercase, setUseLowercase] = useState<boolean>(true);

  const number = '1234567890';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const symbol = '!@#$%^&*()_+/-';

  useEffect(() => {
    generatePassword();
  }, [length, useNumbers, useSymbols, useUppercase, useLowercase]);

  const generatePassword = () => {
    let charSet = '';
    if (useNumbers) charSet += number;
    if (useUppercase) charSet += upper;
    if (useLowercase) charSet += lower;
    if (useSymbols) charSet += symbol;

    if (!charSet) {
      setPassword("Please select at least one option");
      setStrength("Weak");
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomIndex];
    }

    setPassword(generatedPassword);
    checkPasswordStrength(generatedPassword);
  };

  const checkPasswordStrength = (password: string) => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+/\-]/.test(password);
    const minLength = 8;

    if (password.length >= minLength && hasLower && hasUpper && hasNumber && hasSymbol) {
      setStrength("Strong");
    } else if (password.length >= minLength && (hasLower || hasUpper) && (hasNumber || hasSymbol)) {
      setStrength("Medium");
    } else {
      setStrength("Weak");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <main className="max-w-4xl mx-auto select-none">
      <div className="mt-10 mb-5">
        <h1 className="text-4xl text-center leading-loose font-semibold">
          Create strong passwords
        </h1>
      </div>
      <div className={`flex items-center p-10  ${strength === 'Weak' ? 'bg-rose-400' : strength === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400'}`}>
        <input
          className="flex-1 px-3 py-2 text-3xl font-mono font-bold tracking-widest border-b-[3px] border-white outline-none bg-transparent text-white"
          type="text"
          value={password}
          readOnly
        />
        <button className="text-white p-3 active:bg-white/20" onClick={generatePassword}>
          <RotateCw strokeWidth={2.5} />
        </button>
        <button
          className="text-white p-3 active:bg-white/20"
          onClick={copyToClipboard}
          title="Copy to clipboard"
        >
          <Copy strokeWidth={2.5} />
        </button>
      </div>
      <div className="flex gap-5 items-center my-5">
        <label className="text-lg font-semibold" htmlFor="password_length">Password Length</label>
        <input
          className="flex-1 cursor-pointer h-[2px] ${strength === 'Weak' ? 'accent-rose-400' : strength === 'Medium' ? 'accent-amber-400' : 'accent-emerald-400'}`}"
          type="range"
          id="password_length"
          value={length}
          min="1"
          max="99"
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
        <input
          className="p-2 border-2 rounded font-semibold"
          type="number"
          id="password_length"
          value={length}
          min="1"
          max="99"
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
      </div>
      <div className="flex items-center gap-5">
        <div className="flex gap-1 items-center">
          <input
            className="accent-zinc-700 w-5 h-5"
            type="checkbox"
            id="number"
            checked={useNumbers}
            onChange={() => setUseNumbers(!useNumbers)}
          />
          <label className="text-lg text-zinc-600" htmlFor="number">Numbers</label>
        </div>
        <div className="flex gap-1 items-center">
          <input
            className="accent-zinc-700 w-5 h-5"
            type="checkbox"
            id="symbol"
            checked={useSymbols}
            onChange={() => setUseSymbols(!useSymbols)}
          />
          <label className="text-lg text-zinc-600" htmlFor="symbol">Symbols</label>
        </div>
        <div className="flex gap-1 items-center">
          <input
            className="accent-zinc-700 w-5 h-5"
            type="checkbox"
            id="uppercase"
            checked={useUppercase}
            onChange={() => setUseUppercase(!useUppercase)}
          />
          <label className="text-lg text-zinc-600" htmlFor="uppercase">Uppercase</label>
        </div>
        <div className="flex gap-1 items-center">
          <input
            className="accent-zinc-700 w-5 h-5"
            type="checkbox"
            id="lowercase"
            checked={useLowercase}
            onChange={() => setUseLowercase(!useLowercase)}
          />
          <label className="text-lg text-zinc-600" htmlFor="lowercase">Lowercase</label>
        </div>
      </div>
    </main>
  );
};

export default PassWordGenerator;
