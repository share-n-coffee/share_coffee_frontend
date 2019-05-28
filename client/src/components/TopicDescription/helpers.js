import { createEditorState } from "medium-draft";
import mediumDraftExporter from "medium-draft/lib/exporter";
import mediumDraftImporter from "medium-draft/lib/importer";
import { convertToRaw } from "draft-js";

export function exportToHtml(editorState) {
  const renderedHTML = mediumDraftExporter(editorState.getCurrentContent());
  return renderedHTML;
}

export function importFromHtml(renderedHTML) {
  const editorState = createEditorState(convertToRaw(mediumDraftImporter(renderedHTML)));
  return editorState;
}
