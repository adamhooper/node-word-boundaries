#include <memory>

#include <node.h>
#include <unicode/brkiter.h>
#include <v8.h>

void FindWordBoundaries(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::HandleScope scope(isolate);

  v8::String::Value argString(args[0]);
  v8::Handle<v8::Array> retArray(v8::Array::New(isolate, 0));
  args.GetReturnValue().Set(retArray);

  if (argString.length() == 0) {
    return; // retArray is empty
  }

  UErrorCode status = U_ZERO_ERROR;
  std::unique_ptr<BreakIterator> breakIterator(BreakIterator::createWordInstance(Locale::getUS(), status));
  if (U_FAILURE(status)) {
    isolate->ThrowException(v8::Exception::Error(
      v8::String::NewFromUtf8(isolate, "Unknown error calling BreakIterator::createWordInstance()")
    ));
    return;
  }

  icu::UnicodeString unicodeString(false, *argString, argString.length());
  breakIterator->setText(unicodeString);

  int32_t position = breakIterator->first();
  size_t retArrayPosition = 0;

  while (position != BreakIterator::DONE) {
    retArray->Set(retArrayPosition, v8::Integer::New(isolate, position));
    retArrayPosition++;

    position = static_cast<int32_t>(breakIterator->next());
  }
}

void init(v8::Handle<v8::Object> exports) {
  NODE_SET_METHOD(exports, "find_word_boundaries", FindWordBoundaries);
}

NODE_MODULE(find_word_boundaries, init)
