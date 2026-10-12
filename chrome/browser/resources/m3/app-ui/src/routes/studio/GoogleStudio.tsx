// SPDX-License-Identifier: Apache-2.0
import { GoogleStudio as NativeGoogleStudio } from "@aphrody/web-source/integrations/m3/packages/app-ui/src/routes/studio/GoogleStudio.tsx";
import { isBunNative } from "../../bun-bridge";
import { ProductSearchHome } from "../product/ProductSearchHome";
import { useI18n } from "../../i18n";
import { nativeGoogleMessages } from "../product/product-search-messages";

export function GoogleStudio() {
  const language = useI18n((state) => state.language);
  return isBunNative() ? (
    <NativeGoogleStudio language={language} messages={nativeGoogleMessages[language]} />
  ) : (
    <ProductSearchHome />
  );
}
