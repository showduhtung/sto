import type { LanguageKey } from "~/models";
import { FormattedMessage, type MessageDescriptor } from "react-intl";

type TranslatedProps = Omit<MessageDescriptor, "id"> & { id: LanguageKey };

function Translated(props: TranslatedProps) {
  return <FormattedMessage {...props} />;
}

export { Translated };
