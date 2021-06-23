import React, { ReactElement } from 'react';
import * as artist from '../../pkg/ar-tist';

export default function App(): ReactElement {
  return (
    <div>
      App
      <button
        type="button"
        onClick={() => artist.greet()}
      >
        WASM
      </button>
    </div>
  );
}
