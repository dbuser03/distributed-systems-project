import { useParams } from "react-router-dom";
import { useStoryEditor } from "../hooks";
import { StoryEditorForm } from "../components/ui/editor";

function StoryEditorPage() {
  const { id } = useParams<{ id?: string }>();
  const {
    formData,
    isEditing,
    updateField,
    addTag,
    removeTag,
    canSaveDraft,
    canPublish,
    handleSaveDraft,
    handlePublish,
    handleCancel,
  } = useStoryEditor(id);

  return (
    <div className="min-h-full p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">
          {isEditing ? "Edit Story" : "Story Editor"}
        </h1>

        <StoryEditorForm
          formData={formData}
          canSaveDraft={canSaveDraft}
          canPublish={canPublish}
          onUpdateField={updateField}
          onAddTag={addTag}
          onRemoveTag={removeTag}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}

export default StoryEditorPage;
